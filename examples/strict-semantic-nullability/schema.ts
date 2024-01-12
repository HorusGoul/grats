/**
 * Executable schema generated by Grats (https://grats.capt.dev)
 * Do not manually edit. Regenerate by running `npx grats`.
 */
import { allUsers as queryAllUsersResolver } from "./models/User";
import { me as queryMeResolver } from "./Query";
import { person as queryPersonResolver } from "./Query";
import { countdown as subscriptionCountdownResolver } from "./Subscription";
import { nullItems as subscriptionNullItemsResolver } from "./Subscription";
import { nullIterable as subscriptionNullIterableResolver } from "./Subscription";
import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, defaultFieldResolver, GraphQLInterfaceType, GraphQLInt } from "graphql";
async function assertNonNull<T>(value: T | Promise<T>): Promise<T> {
    const awaited = await value;
    if (awaited == null)
        throw new Error("Cannot return null for semantically non-nullable field.");
    return awaited;
}
export function getSchema(): GraphQLSchema {
    const GroupType: GraphQLObjectType = new GraphQLObjectType({
        name: "Group",
        fields() {
            return {
                description: {
                    name: "description",
                    type: GraphQLString,
                    resolve(source, args, context, info) {
                        return assertNonNull(defaultFieldResolver(source, args, context, info));
                    }
                },
                members: {
                    name: "members",
                    type: new GraphQLList(new GraphQLNonNull(UserType)),
                    resolve(source, args, context, info) {
                        return assertNonNull(defaultFieldResolver(source, args, context, info));
                    }
                },
                name: {
                    name: "name",
                    type: GraphQLString,
                    resolve(source, args, context, info) {
                        return assertNonNull(defaultFieldResolver(source, args, context, info));
                    }
                }
            };
        }
    });
    const IPersonType: GraphQLInterfaceType = new GraphQLInterfaceType({
        name: "IPerson",
        fields() {
            return {
                name: {
                    name: "name",
                    type: GraphQLString
                }
            };
        }
    });
    const UserType: GraphQLObjectType = new GraphQLObjectType({
        name: "User",
        fields() {
            return {
                groups: {
                    name: "groups",
                    type: new GraphQLList(new GraphQLNonNull(GroupType)),
                    resolve(source, args, context, info) {
                        return assertNonNull(defaultFieldResolver(source, args, context, info));
                    }
                },
                name: {
                    name: "name",
                    type: GraphQLString,
                    resolve(source, args, context, info) {
                        return assertNonNull(defaultFieldResolver(source, args, context, info));
                    }
                }
            };
        },
        interfaces() {
            return [IPersonType];
        }
    });
    const QueryType: GraphQLObjectType = new GraphQLObjectType({
        name: "Query",
        fields() {
            return {
                allUsers: {
                    name: "allUsers",
                    type: new GraphQLList(new GraphQLNonNull(UserType)),
                    resolve(source) {
                        return assertNonNull(queryAllUsersResolver(source));
                    }
                },
                me: {
                    name: "me",
                    type: UserType,
                    resolve(source) {
                        return assertNonNull(queryMeResolver(source));
                    }
                },
                person: {
                    name: "person",
                    type: IPersonType,
                    resolve(source) {
                        return assertNonNull(queryPersonResolver(source));
                    }
                }
            };
        }
    });
    const SubscriptionType: GraphQLObjectType = new GraphQLObjectType({
        name: "Subscription",
        fields() {
            return {
                countdown: {
                    name: "countdown",
                    type: GraphQLInt,
                    args: {
                        from: {
                            name: "from",
                            type: new GraphQLNonNull(GraphQLInt)
                        }
                    },
                    subscribe(source, args) {
                        return subscriptionCountdownResolver(source, args);
                    },
                    resolve(payload) {
                        return assertNonNull(payload);
                    }
                },
                nullItems: {
                    name: "nullItems",
                    type: GraphQLString,
                    subscribe(source) {
                        return subscriptionNullItemsResolver(source);
                    },
                    resolve(payload) {
                        return assertNonNull(payload);
                    }
                },
                nullIterable: {
                    name: "nullIterable",
                    type: GraphQLString,
                    subscribe(source) {
                        return subscriptionNullIterableResolver(source);
                    },
                    resolve(payload) {
                        return assertNonNull(payload);
                    }
                }
            };
        }
    });
    return new GraphQLSchema({
        query: QueryType,
        subscription: SubscriptionType,
        types: [GroupType, IPersonType, QueryType, SubscriptionType, UserType]
    });
}
