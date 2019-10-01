
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }

      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "Node",
        "possibleTypes": [
          {
            "name": "Group"
          },
          {
            "name": "Hashtag"
          },
          {
            "name": "Level"
          },
          {
            "name": "Photo"
          },
          {
            "name": "User"
          },
          {
            "name": "RallyeRating"
          },
          {
            "name": "RallyeStation"
          }
        ]
      }
    ]
  }
};

      export default result;
    