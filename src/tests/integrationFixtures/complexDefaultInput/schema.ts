import { hello as queryHelloResolver } from "./index";
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from "graphql";
const SomeObjType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: "SomeObj",
    fields() {
        return {
            a: {
                name: "a",
                type: new GraphQLNonNull(GraphQLString)
            }
        };
    }
});
const QueryType: GraphQLObjectType = new GraphQLObjectType({
    name: "Query",
    fields() {
        return {
            hello: {
                name: "hello",
                type: GraphQLString,
                args: {
                    someObj: {
                        name: "someObj",
                        type: new GraphQLNonNull(SomeObjType),
                        defaultValue: {
                            a: "Sup"
                        }
                    }
                },
                resolve(source, args) {
                    return queryHelloResolver(source, args);
                }
            }
        };
    }
});
const schema = new GraphQLSchema({
    query: QueryType,
    types: [QueryType, SomeObjType]
});
export { schema };