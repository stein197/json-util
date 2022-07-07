# CHANGELOG
## [Unreleased]
- `diff()`, `intersect()`

## [1.2.0](../../compare/1.1.4..1.2.0) - 2022-07-07
### Fixed
- `clone()` method now does not use JSON parsing and stringifying utilities.

## [1.1.4](../../compare/1.1.3..1.1.4) - 2022-04-25
### Fixed
- `isEmpty()` function now returns `false` for booleans and numbers.

## [1.1.3](../../compare/1.1.2..1.1.3) - 2022-04-24
### Changed
- Exported arrow functions are regular ones now
### Fixed
- `clone` function now has generic signature

## [1.1.2](../../compare/1.1.1..1.1.2) - 2021-11-09
### Changed
- Upgraded `@stein197/ts-util` package version to `1.3.2`

## [1.1.1](../../compare/1.1.0..1.1.1) - 2021-11-09
### Changed
- Moved package `@stein197/ts-util` from `devDependencies` to `dependencies`

## [1.1.0](../../compare/1.0.0..1.1.0) - 2021-11-05
### Added
- `strictlyEqual()` function
- `partlyEqual()` function

### Changed
- `equal()` has an ability to compare objects partially in addition to strict comparison

## [1.0.0](../../tree/1.0.0) - 2021-11-03
Release
