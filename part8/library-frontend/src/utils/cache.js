export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice

  console.log('cache', cache);

  cache.updateQuery(query, ({ allBooks }) => {
    console.log('allBooks', allBooks);
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

export const updateGenreCache = (cache, query, addedBook) => {
  cache.updateQuery(query, (res) => {
    console.log('res', res);

  })
}

const uniqByName = (a) => {
  let seen = new Set()
  return a.filter((item) => {
    let k = item.title
    return seen.has(k) ? false : seen.add(k)
  })
}