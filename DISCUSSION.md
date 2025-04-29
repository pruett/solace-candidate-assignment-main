# Wrapping up - some notes

## Pagination

I've added some pagination-related logic to the the api route [here](src/app/api/advocates/route.ts), however we are not using it on the frontend. Given more time, I would like to explore leveraging this on the frontend

## Tabular data

The advocate data now is lacking a lot of functionality and modern UI polish. Given more time, I'd like to use something like [Tanstack Table](https://tanstack.com/table/latest) to given the table more functionality like sorting, column, filtering, etc.

## Filtering

I'm not sure if filtering on every keystroke is better than doing it on button click or form submission. Right now, we are doing the former, and relying on `nuqs` to handle the throttling. Given more time, I'd like to inspect and tweak that a bit and reduce the number of requests to improve performance.

## Caching

I've purposely avoided leveraging Next.js caching in this exercise as I know it's not a Next.js-specific assignment. Given more time and understanding of the whole system, I'd like to spend some time exploring caching options.
