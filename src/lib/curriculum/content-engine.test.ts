import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { getCurriculumGraph, generateSlug } from './content-engine';

describe('Curriculum Content Engine', () => {
  const TEST_DIR = path.join(process.cwd(), '.test-curriculum-fixtures');

  before(() => {
    // Setup test dir
    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR, { recursive: true });
    }
  });

  after(() => {
    // Cleanup
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  test('generateSlug normalizes IDs correctly', () => {
    assert.strictEqual(generateSlug('FIN 1.2.1'), 'fin-1-2-1');
    assert.strictEqual(generateSlug('MST 01'), 'mst-01');
  });

  test('Fail-fast: Missing mandatory files throws error', () => {
    assert.throws(
      () => getCurriculumGraph(TEST_DIR),
      {
        message: /Curriculum structural validation failed:\n- Missing mandatory source:/
      }
    );
  });

  test('Fail-fast: Duplicate ID and Slug collision', () => {
    // Create a mock structure
    fs.mkdirSync(path.join(TEST_DIR, 'finance'), { recursive: true });
    
    // Write level 1 with duplicates
    fs.writeFileSync(path.join(TEST_DIR, 'finance', 'level-1.md'), `---
pillar: finance
level: 1
---

## FIN 1.1.1 — Titlu
**Întrebarea antreprenorială:** q1
**Titlu pentru participant:** tp1
**Descriere pentru participant:** dp1
**Continuitate:** c1

## FIN 1.1.1 — Titlu duplicat
**Întrebarea antreprenorială:** q2
**Titlu pentru participant:** tp2
**Descriere pentru participant:** dp2
**Continuitate:** c2
`);

    // We still need all 25 files to avoid "missing mandatory source" errors masking the duplicate ID error,
    // so let's mock all files minimally, or we can just expect both errors.
    
    assert.throws(
      () => getCurriculumGraph(TEST_DIR),
      (err: Error) => {
        return err.message.includes('Duplicate ID found: FIN 1.1.1') && 
               err.message.includes('Missing mandatory source:');
      }
    );
    
    fs.rmSync(path.join(TEST_DIR, 'finance'), { recursive: true, force: true });
  });

  test('Success: Real curriculum validates exactly 191 rounds and 5 lenses', () => {
    // We run it on the real directory
    const graph = getCurriculumGraph();
    
    // Assert exactly 191 rounds
    assert.strictEqual(graph.rounds.length, 191);

    // Assert exact 178 Level 1-5
    const l1to5 = graph.rounds.filter(r => r.level !== 'MST');
    assert.strictEqual(l1to5.length, 178);

    // Assert exact 13 Mastery rounds
    const mst = graph.rounds.filter(r => r.level === 'MST');
    assert.strictEqual(mst.length, 13);

    // Assert exactly 5 lenses
    assert.strictEqual(graph.lenses.length, 5);

    // Assert lenses are not empty
    for (const lens of graph.lenses) {
      assert.ok(lens.standard_profunzime.length > 0, `Lens ${lens.pillar} standard profunzime is empty`);
      assert.ok(lens.corp_dovezi.length > 0, `Lens ${lens.pillar} corp dovezi is empty`);
    }
  });
});
