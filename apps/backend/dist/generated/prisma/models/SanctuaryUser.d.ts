import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SanctuaryUserModel = runtime.Types.Result.DefaultSelection<Prisma.$SanctuaryUserPayload>;
export type AggregateSanctuaryUser = {
    _count: SanctuaryUserCountAggregateOutputType | null;
    _avg: SanctuaryUserAvgAggregateOutputType | null;
    _sum: SanctuaryUserSumAggregateOutputType | null;
    _min: SanctuaryUserMinAggregateOutputType | null;
    _max: SanctuaryUserMaxAggregateOutputType | null;
};
export type SanctuaryUserAvgAggregateOutputType = {
    id: number | null;
};
export type SanctuaryUserSumAggregateOutputType = {
    id: number | null;
};
export type SanctuaryUserMinAggregateOutputType = {
    id: number | null;
    dob: string | null;
    passcode: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SanctuaryUserMaxAggregateOutputType = {
    id: number | null;
    dob: string | null;
    passcode: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SanctuaryUserCountAggregateOutputType = {
    id: number;
    dob: number;
    passcode: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SanctuaryUserAvgAggregateInputType = {
    id?: true;
};
export type SanctuaryUserSumAggregateInputType = {
    id?: true;
};
export type SanctuaryUserMinAggregateInputType = {
    id?: true;
    dob?: true;
    passcode?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SanctuaryUserMaxAggregateInputType = {
    id?: true;
    dob?: true;
    passcode?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SanctuaryUserCountAggregateInputType = {
    id?: true;
    dob?: true;
    passcode?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SanctuaryUserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctuaryUserWhereInput;
    orderBy?: Prisma.SanctuaryUserOrderByWithRelationInput | Prisma.SanctuaryUserOrderByWithRelationInput[];
    cursor?: Prisma.SanctuaryUserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SanctuaryUserCountAggregateInputType;
    _avg?: SanctuaryUserAvgAggregateInputType;
    _sum?: SanctuaryUserSumAggregateInputType;
    _min?: SanctuaryUserMinAggregateInputType;
    _max?: SanctuaryUserMaxAggregateInputType;
};
export type GetSanctuaryUserAggregateType<T extends SanctuaryUserAggregateArgs> = {
    [P in keyof T & keyof AggregateSanctuaryUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSanctuaryUser[P]> : Prisma.GetScalarType<T[P], AggregateSanctuaryUser[P]>;
};
export type SanctuaryUserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctuaryUserWhereInput;
    orderBy?: Prisma.SanctuaryUserOrderByWithAggregationInput | Prisma.SanctuaryUserOrderByWithAggregationInput[];
    by: Prisma.SanctuaryUserScalarFieldEnum[] | Prisma.SanctuaryUserScalarFieldEnum;
    having?: Prisma.SanctuaryUserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SanctuaryUserCountAggregateInputType | true;
    _avg?: SanctuaryUserAvgAggregateInputType;
    _sum?: SanctuaryUserSumAggregateInputType;
    _min?: SanctuaryUserMinAggregateInputType;
    _max?: SanctuaryUserMaxAggregateInputType;
};
export type SanctuaryUserGroupByOutputType = {
    id: number;
    dob: string;
    passcode: string;
    createdAt: Date;
    updatedAt: Date;
    _count: SanctuaryUserCountAggregateOutputType | null;
    _avg: SanctuaryUserAvgAggregateOutputType | null;
    _sum: SanctuaryUserSumAggregateOutputType | null;
    _min: SanctuaryUserMinAggregateOutputType | null;
    _max: SanctuaryUserMaxAggregateOutputType | null;
};
export type GetSanctuaryUserGroupByPayload<T extends SanctuaryUserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SanctuaryUserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SanctuaryUserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SanctuaryUserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SanctuaryUserGroupByOutputType[P]>;
}>>;
export type SanctuaryUserWhereInput = {
    AND?: Prisma.SanctuaryUserWhereInput | Prisma.SanctuaryUserWhereInput[];
    OR?: Prisma.SanctuaryUserWhereInput[];
    NOT?: Prisma.SanctuaryUserWhereInput | Prisma.SanctuaryUserWhereInput[];
    id?: Prisma.IntFilter<"SanctuaryUser"> | number;
    dob?: Prisma.StringFilter<"SanctuaryUser"> | string;
    passcode?: Prisma.StringFilter<"SanctuaryUser"> | string;
    createdAt?: Prisma.DateTimeFilter<"SanctuaryUser"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SanctuaryUser"> | Date | string;
};
export type SanctuaryUserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    dob?: Prisma.SortOrder;
    passcode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SanctuaryUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.SanctuaryUserWhereInput | Prisma.SanctuaryUserWhereInput[];
    OR?: Prisma.SanctuaryUserWhereInput[];
    NOT?: Prisma.SanctuaryUserWhereInput | Prisma.SanctuaryUserWhereInput[];
    dob?: Prisma.StringFilter<"SanctuaryUser"> | string;
    passcode?: Prisma.StringFilter<"SanctuaryUser"> | string;
    createdAt?: Prisma.DateTimeFilter<"SanctuaryUser"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SanctuaryUser"> | Date | string;
}, "id">;
export type SanctuaryUserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    dob?: Prisma.SortOrder;
    passcode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SanctuaryUserCountOrderByAggregateInput;
    _avg?: Prisma.SanctuaryUserAvgOrderByAggregateInput;
    _max?: Prisma.SanctuaryUserMaxOrderByAggregateInput;
    _min?: Prisma.SanctuaryUserMinOrderByAggregateInput;
    _sum?: Prisma.SanctuaryUserSumOrderByAggregateInput;
};
export type SanctuaryUserScalarWhereWithAggregatesInput = {
    AND?: Prisma.SanctuaryUserScalarWhereWithAggregatesInput | Prisma.SanctuaryUserScalarWhereWithAggregatesInput[];
    OR?: Prisma.SanctuaryUserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SanctuaryUserScalarWhereWithAggregatesInput | Prisma.SanctuaryUserScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"SanctuaryUser"> | number;
    dob?: Prisma.StringWithAggregatesFilter<"SanctuaryUser"> | string;
    passcode?: Prisma.StringWithAggregatesFilter<"SanctuaryUser"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SanctuaryUser"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SanctuaryUser"> | Date | string;
};
export type SanctuaryUserCreateInput = {
    dob: string;
    passcode: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SanctuaryUserUncheckedCreateInput = {
    id?: number;
    dob: string;
    passcode: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SanctuaryUserUpdateInput = {
    dob?: Prisma.StringFieldUpdateOperationsInput | string;
    passcode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctuaryUserUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    dob?: Prisma.StringFieldUpdateOperationsInput | string;
    passcode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctuaryUserCreateManyInput = {
    id?: number;
    dob: string;
    passcode: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SanctuaryUserUpdateManyMutationInput = {
    dob?: Prisma.StringFieldUpdateOperationsInput | string;
    passcode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctuaryUserUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    dob?: Prisma.StringFieldUpdateOperationsInput | string;
    passcode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctuaryUserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dob?: Prisma.SortOrder;
    passcode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SanctuaryUserAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type SanctuaryUserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dob?: Prisma.SortOrder;
    passcode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SanctuaryUserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dob?: Prisma.SortOrder;
    passcode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SanctuaryUserSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type SanctuaryUserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dob?: boolean;
    passcode?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sanctuaryUser"]>;
export type SanctuaryUserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dob?: boolean;
    passcode?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sanctuaryUser"]>;
export type SanctuaryUserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dob?: boolean;
    passcode?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sanctuaryUser"]>;
export type SanctuaryUserSelectScalar = {
    id?: boolean;
    dob?: boolean;
    passcode?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SanctuaryUserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "dob" | "passcode" | "createdAt" | "updatedAt", ExtArgs["result"]["sanctuaryUser"]>;
export type $SanctuaryUserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SanctuaryUser";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["sanctuaryUser"]>;
    composites: {};
};
export type SanctuaryUserGetPayload<S extends boolean | null | undefined | SanctuaryUserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload, S>;
export type SanctuaryUserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SanctuaryUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SanctuaryUserCountAggregateInputType | true;
};
export interface SanctuaryUserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SanctuaryUser'];
        meta: {
            name: 'SanctuaryUser';
        };
    };
    findUnique<T extends SanctuaryUserFindUniqueArgs>(args: Prisma.SelectSubset<T, SanctuaryUserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SanctuaryUserClient<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SanctuaryUserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SanctuaryUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SanctuaryUserClient<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SanctuaryUserFindFirstArgs>(args?: Prisma.SelectSubset<T, SanctuaryUserFindFirstArgs<ExtArgs>>): Prisma.Prisma__SanctuaryUserClient<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SanctuaryUserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SanctuaryUserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SanctuaryUserClient<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SanctuaryUserFindManyArgs>(args?: Prisma.SelectSubset<T, SanctuaryUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SanctuaryUserCreateArgs>(args: Prisma.SelectSubset<T, SanctuaryUserCreateArgs<ExtArgs>>): Prisma.Prisma__SanctuaryUserClient<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SanctuaryUserCreateManyArgs>(args?: Prisma.SelectSubset<T, SanctuaryUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SanctuaryUserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SanctuaryUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SanctuaryUserDeleteArgs>(args: Prisma.SelectSubset<T, SanctuaryUserDeleteArgs<ExtArgs>>): Prisma.Prisma__SanctuaryUserClient<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SanctuaryUserUpdateArgs>(args: Prisma.SelectSubset<T, SanctuaryUserUpdateArgs<ExtArgs>>): Prisma.Prisma__SanctuaryUserClient<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SanctuaryUserDeleteManyArgs>(args?: Prisma.SelectSubset<T, SanctuaryUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SanctuaryUserUpdateManyArgs>(args: Prisma.SelectSubset<T, SanctuaryUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SanctuaryUserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SanctuaryUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SanctuaryUserUpsertArgs>(args: Prisma.SelectSubset<T, SanctuaryUserUpsertArgs<ExtArgs>>): Prisma.Prisma__SanctuaryUserClient<runtime.Types.Result.GetResult<Prisma.$SanctuaryUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SanctuaryUserCountArgs>(args?: Prisma.Subset<T, SanctuaryUserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SanctuaryUserCountAggregateOutputType> : number>;
    aggregate<T extends SanctuaryUserAggregateArgs>(args: Prisma.Subset<T, SanctuaryUserAggregateArgs>): Prisma.PrismaPromise<GetSanctuaryUserAggregateType<T>>;
    groupBy<T extends SanctuaryUserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SanctuaryUserGroupByArgs['orderBy'];
    } : {
        orderBy?: SanctuaryUserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SanctuaryUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSanctuaryUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SanctuaryUserFieldRefs;
}
export interface Prisma__SanctuaryUserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SanctuaryUserFieldRefs {
    readonly id: Prisma.FieldRef<"SanctuaryUser", 'Int'>;
    readonly dob: Prisma.FieldRef<"SanctuaryUser", 'String'>;
    readonly passcode: Prisma.FieldRef<"SanctuaryUser", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SanctuaryUser", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SanctuaryUser", 'DateTime'>;
}
export type SanctuaryUserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    where: Prisma.SanctuaryUserWhereUniqueInput;
};
export type SanctuaryUserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    where: Prisma.SanctuaryUserWhereUniqueInput;
};
export type SanctuaryUserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    where?: Prisma.SanctuaryUserWhereInput;
    orderBy?: Prisma.SanctuaryUserOrderByWithRelationInput | Prisma.SanctuaryUserOrderByWithRelationInput[];
    cursor?: Prisma.SanctuaryUserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctuaryUserScalarFieldEnum | Prisma.SanctuaryUserScalarFieldEnum[];
};
export type SanctuaryUserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    where?: Prisma.SanctuaryUserWhereInput;
    orderBy?: Prisma.SanctuaryUserOrderByWithRelationInput | Prisma.SanctuaryUserOrderByWithRelationInput[];
    cursor?: Prisma.SanctuaryUserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctuaryUserScalarFieldEnum | Prisma.SanctuaryUserScalarFieldEnum[];
};
export type SanctuaryUserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    where?: Prisma.SanctuaryUserWhereInput;
    orderBy?: Prisma.SanctuaryUserOrderByWithRelationInput | Prisma.SanctuaryUserOrderByWithRelationInput[];
    cursor?: Prisma.SanctuaryUserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctuaryUserScalarFieldEnum | Prisma.SanctuaryUserScalarFieldEnum[];
};
export type SanctuaryUserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SanctuaryUserCreateInput, Prisma.SanctuaryUserUncheckedCreateInput>;
};
export type SanctuaryUserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SanctuaryUserCreateManyInput | Prisma.SanctuaryUserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SanctuaryUserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    data: Prisma.SanctuaryUserCreateManyInput | Prisma.SanctuaryUserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SanctuaryUserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SanctuaryUserUpdateInput, Prisma.SanctuaryUserUncheckedUpdateInput>;
    where: Prisma.SanctuaryUserWhereUniqueInput;
};
export type SanctuaryUserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SanctuaryUserUpdateManyMutationInput, Prisma.SanctuaryUserUncheckedUpdateManyInput>;
    where?: Prisma.SanctuaryUserWhereInput;
    limit?: number;
};
export type SanctuaryUserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SanctuaryUserUpdateManyMutationInput, Prisma.SanctuaryUserUncheckedUpdateManyInput>;
    where?: Prisma.SanctuaryUserWhereInput;
    limit?: number;
};
export type SanctuaryUserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    where: Prisma.SanctuaryUserWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctuaryUserCreateInput, Prisma.SanctuaryUserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SanctuaryUserUpdateInput, Prisma.SanctuaryUserUncheckedUpdateInput>;
};
export type SanctuaryUserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
    where: Prisma.SanctuaryUserWhereUniqueInput;
};
export type SanctuaryUserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctuaryUserWhereInput;
    limit?: number;
};
export type SanctuaryUserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctuaryUserSelect<ExtArgs> | null;
    omit?: Prisma.SanctuaryUserOmit<ExtArgs> | null;
};
