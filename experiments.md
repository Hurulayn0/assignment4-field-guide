# Part 1 experiments
Name: Huriye Kayadelen; Student number: 2200005795

## Predictions recorded before this run
1. Missing and undefined should activate array/object defaults; null should remain null.
2. Destructuring undefined/null should throw caught TypeErrors.
3. A bare object assignment should fail parsing; parentheses should fix it.
4. The nested sensor should remain shared after object rest.
5. An empty typed array should produce undefined; its default should supply a string.
6. The unsuppressed T5 typo should produce TS2339; the corrected property should produce 2.
7. T1 should create a variable named string, not a type annotation.
8. The eight comparison cases should be rejected by isolated strict compiler checks.

## Results
Observed after the run below.

All eight predictions matched the actual run. npm run all and npm run check exited 0. The eight comparison cases and the unsuppressed T5 experiment each exited 2 with the expected diagnostics. Exact sources/messages are in logs/compiler-diagnostics.txt and logs/t5-diagnostic.txt. Temporary experiment sources were removed.

## Part 2 props predictions - 16 November 2026
P1/P2 should render identical HTML for both prop styles and children syntaxes. Text, numbers and elements should render; undefined/null/false should leave no content. A direct function child should warn and render nothing, while an explicitly called render prop should render mint. The object-child deliberate experiment should throw a caught Error. Rest should forward DOM props; the last className should win. Slots and children designs should match here. Missing/undefined titles should use Balcony; null should leave an empty heading. Five isolated P7 misuse cases should fail strict compilation.

## Part 2 props observations
All runtime predictions matched output.txt. The React warning preserves the actual console arguments, including %s placeholders. All five P7 misuse cases exited 2. No suppressions were added and temporary experiment sources were removed. npm run all and npm run check exited 0.

## Depth predictions - before the 16 November run
D1: string, Set and Map patterns should use iteration. Taking one generator value should run finally without visiting the second yield; an array-like object without Symbol.iterator should throw. D2: only the undefined positions should call defaults, in left-to-right order. D3: rest should copy own enumerable strings/symbols, read the getter once, omit inherited/hidden keys and share nested sensor. D4: property targets should swap, and catch should read message. D5: inferred head/tail/Parameters types should compile and the generic crop renderer should output basil: 2 L.

## Depth observations
All five experiment groups matched the predictions. Exact D1-D5 lines are in output.txt. The deliberate non-iterable failure was caught. npm run all and npm run check exited 0 with no added type suppression.
