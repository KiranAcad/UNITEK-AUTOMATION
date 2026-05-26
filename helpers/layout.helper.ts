import { Locator, expect } from '@playwright/test';
import { logger } from '../logger';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class LayoutHelper {
  /**
   * Asserts that a locator is visible and returns its bounding box.
   */
  static async getBoundingBox(locator: Locator, name: string): Promise<BoundingBox> {
    await expect(locator).toBeVisible({ timeout: 5000 });
    const box = await locator.boundingBox();
    if (!box) {
      throw new Error(`Could not retrieve bounding box for element: ${name}`);
    }
    return box;
  }

  /**
   * Asserts that a list of elements are stacked vertically in order (from top to bottom).
   * Also verifies that the gap (vertical spacing) between each consecutive element is within a specified range.
   */
  static async assertVerticalStack(
    locators: { locator: Locator; name: string }[],
    minSpacingPx = 5,
    maxSpacingPx = 100
  ): Promise<void> {
    logger.info(`Validating vertical stacking layout for ${locators.length} elements`);
    
    let previousBox: BoundingBox | null = null;
    let previousName = '';

    for (const item of locators) {
      const box = await this.getBoundingBox(item.locator, item.name);
      
      // Ensure element has valid physical dimensions
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);

      if (previousBox) {
        // In a vertical stack, the top of the current element must be below the bottom of the previous element
        const previousBottom = previousBox.y + previousBox.height;
        const currentTop = box.y;
        
        logger.info(
          `Layout check - Stacking: [${previousName}] bottom is at y=${previousBottom.toFixed(1)}px. ` +
          `[${item.name}] top is at y=${currentTop.toFixed(1)}px.`
        );

        // Assert that the current element is visually below the previous element
        expect(currentTop, `[${item.name}] (top y=${currentTop}) should be below [${previousName}] (bottom y=${previousBottom})`).toBeGreaterThanOrEqual(previousBottom - 2); // 2px tolerance for rounding

        // Assert vertical spacing (gap) between elements
        const gap = currentTop - previousBottom;
        logger.info(`Layout check - Spacing: Gap between [${previousName}] and [${item.name}] is ${gap.toFixed(1)}px`);
        
        expect(
          gap,
          `🚨 SPACING DEVIATION: Gap between [${previousName}] and [${item.name}] is ${gap.toFixed(1)}px. ` +
          `Figma spec spacing should be between ${minSpacingPx}px and ${maxSpacingPx}px.`
        ).toBeGreaterThanOrEqual(minSpacingPx);

        expect(
          gap,
          `🚨 SPACING DEVIATION: Gap between [${previousName}] and [${item.name}] is ${gap.toFixed(1)}px. ` +
          `Figma spec spacing should be between ${minSpacingPx}px and ${maxSpacingPx}px.`
        ).toBeLessThanOrEqual(maxSpacingPx);
      }

      previousBox = box;
      previousName = item.name;
    }
  }

  /**
   * Asserts that a list of elements are aligned horizontally (e.g. side-by-side or columns).
   * Verifies that their top 'y' coordinates are within a specific tolerance, and that they are ordered left-to-right.
   */
  static async assertHorizontalAlignment(
    locators: { locator: Locator; name: string }[],
    yTolerancePx = 15,
    minSpacingPx = 0
  ): Promise<void> {
    logger.info(`Validating horizontal alignment layout for ${locators.length} elements`);
    
    let previousBox: BoundingBox | null = null;
    let previousName = '';

    for (const item of locators) {
      const box = await this.getBoundingBox(item.locator, item.name);
      
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);

      if (previousBox) {
        // Assert elements are horizontally sequential (left to right)
        const previousRight = previousBox.x + previousBox.width;
        const currentLeft = box.x;

        logger.info(
          `Layout check - Horizontal flow: [${previousName}] right edge at x=${previousRight.toFixed(1)}px. ` +
          `[${item.name}] left edge at x=${currentLeft.toFixed(1)}px.`
        );

        expect(currentLeft, `[${item.name}] (left x=${currentLeft}) should be to the right of [${previousName}] (right x=${previousRight})`).toBeGreaterThanOrEqual(previousRight - 2);

        // Assert vertical alignment is close (within tolerance)
        const yDiff = Math.abs(box.y - previousBox.y);
        logger.info(`Layout check - Vertical alignment difference: ${yDiff.toFixed(1)}px`);
        expect(
          yDiff,
          `🚨 ALIGNMENT SHIFT: Vertical alignment between [${previousName}] and [${item.name}] deviates by ${yDiff.toFixed(1)}px (tolerance: ${yTolerancePx}px).`
        ).toBeLessThanOrEqual(yTolerancePx);

        if (minSpacingPx > 0) {
          const gap = currentLeft - previousRight;
          expect(
            gap,
            `🚨 HORIZONTAL SPACING DEVIATION: Horizontal gap between [${previousName}] and [${item.name}] is ${gap.toFixed(1)}px. Should be at least ${minSpacingPx}px.`
          ).toBeGreaterThanOrEqual(minSpacingPx);
        }
      }

      previousBox = box;
      previousName = item.name;
    }
  }

  /**
   * Verifies that two elements do not visually overlap on the page.
   */
  static async assertNoOverlap(
    itemA: { locator: Locator; name: string },
    itemB: { locator: Locator; name: string }
  ): Promise<void> {
    const boxA = await this.getBoundingBox(itemA.locator, itemA.name);
    const boxB = await this.getBoundingBox(itemB.locator, itemB.name);

    const overlapX = boxA.x < boxB.x + boxB.width && boxA.x + boxA.width > boxB.x;
    const overlapY = boxA.y < boxB.y + boxB.height && boxA.y + boxA.height > boxB.y;

    const overlaps = overlapX && overlapY;
    
    if (overlaps) {
      logger.error(`🚨 OVERLAP DETECTED: [${itemA.name}] and [${itemB.name}] overlap.`);
      logger.error(`[${itemA.name}] Box:`, boxA);
      logger.error(`[${itemB.name}] Box:`, boxB);
    }

    expect(overlaps, `🚨 LAYOUT FAULT: Element [${itemA.name}] overlaps with element [${itemB.name}].`).toBeFalsy();
  }

  /**
   * Asserts that a list of form fields are vertically aligned (e.g. have matching left 'x' coordinates).
   */
  static async assertFormFieldsLeftAligned(
    fields: { locator: Locator; name: string }[],
    xTolerancePx = 10
  ): Promise<void> {
    logger.info(`Validating left-alignment for ${fields.length} form elements`);
    
    let baseLeftX: number | null = null;
    let baseName = '';

    for (const item of fields) {
      const box = await this.getBoundingBox(item.locator, item.name);
      
      if (baseLeftX === null) {
        baseLeftX = box.x;
        baseName = item.name;
        continue;
      }

      const diff = Math.abs(box.x - baseLeftX);
      logger.info(`Layout check - Left alignment: [${item.name}] deviates from [${baseName}] by ${diff.toFixed(1)}px`);
      
      expect(
        diff,
        `🚨 FIELD ALIGNMENT DRIFT: [${item.name}] left edge (x=${box.x.toFixed(1)}px) deviates from ` +
        `[${baseName}] left edge (x=${baseLeftX.toFixed(1)}px) by ${diff.toFixed(1)}px (tolerance: ${xTolerancePx}px).`
      ).toBeLessThanOrEqual(xTolerancePx);
    }
  }
}
