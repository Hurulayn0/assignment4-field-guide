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
