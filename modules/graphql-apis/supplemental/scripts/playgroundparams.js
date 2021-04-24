// See https://github.com/graphql/graphql-playground/issues/1018#issuecomment-762935106

const baseUrl = `https://movies.neo4j-graphql.com`

// tabs must be an array
const tabsData = [
  {
    // tab url
    endpoint: baseUrl,
    // tab name
    name: "Movies",
    // tab variables, NOTE: variables are unique in that they must be passed to the VariableEditor as a String, hence JSON.stringify
    // variables: JSON.stringify({ id: 1 }),
    // tab headers
    // headers: { authorization: `Bearer 123` },
    // tab query
    query: `
{
  movies(options: { limit: 10 }) {
    title
    actors {
      name
    }
  }
}
    `,
    // tab responses
    // responses: [
    //   `
    //     {
    //       "data": {
    //         "user": {
    //           "id": 1
    //         }
    //       }
    //     }
    //   `,
    // ],
  },
]

// create tabsQueryParam
const tabsQueryParam = new URLSearchParams({
  tabs: JSON.stringify(tabsData),
}).toString()

// concat with baseUrl
const url = `${baseUrl}?${tabsQueryParam}`

console.log(url)