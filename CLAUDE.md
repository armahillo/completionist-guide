# Completionist Guide

*Last updated: 2026-05-11 11:08*

This codebase is a Jekyll site that renders a static HTML site intended for tracking progress in various video games.

The goal is to have a front-end only lightweight web application that can be used from a mobile device and provide checklist-style tracking of various facets of a game. It should use local storage to track progress across sessions, within a device.

## Technical specification

- Uses Jekyll framework
- Uses SCSS for CSS
- Uses YAML for datastores
- Uses minimal JS

### Backend

There is no backend.

### Frontend

I have tried to do as much presentation logic using CSS as possible. You'll see this in `@_scss/components/_guide.scss` and `@_scss/games/_zelda_botw.scss` (or the other files in there) for example.

Javascript handles the data-persistence via browser local storage. It uses form serialization, converting to JSON format, and storing that in the browser storage objects. Then vice-versa on page load / refresh.