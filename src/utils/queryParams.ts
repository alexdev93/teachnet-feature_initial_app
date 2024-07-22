import { NextRouter } from 'next/router';

export const upsertQueryParam = (router: NextRouter, key: string, value: string) => {
  const currentPath = router.pathname;
  const currentQuery = { ...router.query, [key]: value };

  router.push(
    {
      pathname: currentPath,
      query: currentQuery,
    },
    undefined,
    { shallow: true },
  );
};

export const removeQueryParam = (router: NextRouter, key: string) => {
  const currentPath = router.pathname;
  const currentQuery = { ...router.query };
  delete currentQuery[key];

  router.push(
    {
      pathname: currentPath,
      query: currentQuery,
    },
    undefined,
    { shallow: true },
  );
};
