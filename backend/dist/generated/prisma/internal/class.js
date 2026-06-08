"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "datasource db {\n  provider = \"postgresql\"\n}\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\nmodel SanctuaryUser {\n  id        Int      @id @default(autoincrement())\n  dob       String // Format: \"YYYY-MM-DD\"\n  passcode  String // e.g. \"7777\"\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Admin {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  password  String // Hashed password\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"SanctuaryUser\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"dob\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passcode\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Admin\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"SanctuaryUser.findUnique\",\"SanctuaryUser.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"SanctuaryUser.findFirst\",\"SanctuaryUser.findFirstOrThrow\",\"SanctuaryUser.findMany\",\"data\",\"SanctuaryUser.createOne\",\"SanctuaryUser.createMany\",\"SanctuaryUser.createManyAndReturn\",\"SanctuaryUser.updateOne\",\"SanctuaryUser.updateMany\",\"SanctuaryUser.updateManyAndReturn\",\"create\",\"update\",\"SanctuaryUser.upsertOne\",\"SanctuaryUser.deleteOne\",\"SanctuaryUser.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"SanctuaryUser.groupBy\",\"SanctuaryUser.aggregate\",\"Admin.findUnique\",\"Admin.findUniqueOrThrow\",\"Admin.findFirst\",\"Admin.findFirstOrThrow\",\"Admin.findMany\",\"Admin.createOne\",\"Admin.createMany\",\"Admin.createManyAndReturn\",\"Admin.updateOne\",\"Admin.updateMany\",\"Admin.updateManyAndReturn\",\"Admin.upsertOne\",\"Admin.deleteOne\",\"Admin.deleteMany\",\"Admin.groupBy\",\"Admin.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"email\",\"password\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"dob\",\"passcode\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "UBUgCCwAAEMAMC0AAAQAEC4AAEMAMC8CAAAAATJAAEEAITNAAEEAIT8BAEAAIUABAEAAIQEAAAABACABAAAAAQAgCCwAAEMAMC0AAAQAEC4AAEMAMC8CAD8AITJAAEEAITNAAEEAIT8BAEAAIUABAEAAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAFLwIAAAABMkAAAAABM0AAAAABPwEAAAABQAEAAAABAQgAAAkAIAUvAgAAAAEyQAAAAAEzQAAAAAE_AQAAAAFAAQAAAAEBCAAACwAwAQgAAAsAMAUvAgBLACEyQABKACEzQABKACE_AQBJACFAAQBJACECAAAAAQAgCAAADgAgBS8CAEsAITJAAEoAITNAAEoAIT8BAEkAIUABAEkAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBRUAAEwAIBYAAE0AIBcAAFAAIBgAAE8AIBkAAE4AIAgsAABCADAtAAAXABAuAABCADAvAgA0ACEyQAA2ACEzQAA2ACE_AQA1ACFAAQA1ACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAgsAAA-ADAtAAAdABAuAAA-ADAvAgAAAAEwAQAAAAExAQBAACEyQABBACEzQABBACEBAAAAGgAgAQAAABoAIAgsAAA-ADAtAAAdABAuAAA-ADAvAgA_ACEwAQBAACExAQBAACEyQABBACEzQABBACEAAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgBS8CAAAAATABAAAAATEBAAAAATJAAAAAATNAAAAAAQEIAAAiACAFLwIAAAABMAEAAAABMQEAAAABMkAAAAABM0AAAAABAQgAACQAMAEIAAAkADAFLwIASwAhMAEASQAhMQEASQAhMkAASgAhM0AASgAhAgAAABoAIAgAACcAIAUvAgBLACEwAQBJACExAQBJACEyQABKACEzQABKACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAUVAABEACAWAABFACAXAABIACAYAABHACAZAABGACAILAAAMwAwLQAAMAAQLgAAMwAwLwIANAAhMAEANQAhMQEANQAhMkAANgAhM0AANgAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACAILAAAMwAwLQAAMAAQLgAAMwAwLwIANAAhMAEANQAhMQEANQAhMkAANgAhM0AANgAhDRUAADgAIBYAAD0AIBcAADgAIBgAADgAIBkAADgAIDQCAAAAATUCAAAABDYCAAAABDcCAAAAATgCAAAAATkCAAAAAToCAAAAATsCADwAIQ4VAAA4ACAYAAA7ACAZAAA7ACA0AQAAAAE1AQAAAAQ2AQAAAAQ3AQAAAAE4AQAAAAE5AQAAAAE6AQAAAAE7AQA6ACE8AQAAAAE9AQAAAAE-AQAAAAELFQAAOAAgGAAAOQAgGQAAOQAgNEAAAAABNUAAAAAENkAAAAAEN0AAAAABOEAAAAABOUAAAAABOkAAAAABO0AANwAhCxUAADgAIBgAADkAIBkAADkAIDRAAAAAATVAAAAABDZAAAAABDdAAAAAAThAAAAAATlAAAAAATpAAAAAATtAADcAIQg0AgAAAAE1AgAAAAQ2AgAAAAQ3AgAAAAE4AgAAAAE5AgAAAAE6AgAAAAE7AgA4ACEINEAAAAABNUAAAAAENkAAAAAEN0AAAAABOEAAAAABOUAAAAABOkAAAAABO0AAOQAhDhUAADgAIBgAADsAIBkAADsAIDQBAAAAATUBAAAABDYBAAAABDcBAAAAATgBAAAAATkBAAAAAToBAAAAATsBADoAITwBAAAAAT0BAAAAAT4BAAAAAQs0AQAAAAE1AQAAAAQ2AQAAAAQ3AQAAAAE4AQAAAAE5AQAAAAE6AQAAAAE7AQA7ACE8AQAAAAE9AQAAAAE-AQAAAAENFQAAOAAgFgAAPQAgFwAAOAAgGAAAOAAgGQAAOAAgNAIAAAABNQIAAAAENgIAAAAENwIAAAABOAIAAAABOQIAAAABOgIAAAABOwIAPAAhCDQIAAAAATUIAAAABDYIAAAABDcIAAAAATgIAAAAATkIAAAAAToIAAAAATsIAD0AIQgsAAA-ADAtAAAdABAuAAA-ADAvAgA_ACEwAQBAACExAQBAACEyQABBACEzQABBACEINAIAAAABNQIAAAAENgIAAAAENwIAAAABOAIAAAABOQIAAAABOgIAAAABOwIAOAAhCzQBAAAAATUBAAAABDYBAAAABDcBAAAAATgBAAAAATkBAAAAAToBAAAAATsBADsAITwBAAAAAT0BAAAAAT4BAAAAAQg0QAAAAAE1QAAAAAQ2QAAAAAQ3QAAAAAE4QAAAAAE5QAAAAAE6QAAAAAE7QAA5ACEILAAAQgAwLQAAFwAQLgAAQgAwLwIANAAhMkAANgAhM0AANgAhPwEANQAhQAEANQAhCCwAAEMAMC0AAAQAEC4AAEMAMC8CAD8AITJAAEEAITNAAEEAIT8BAEAAIUABAEAAIQAAAAAAAUEBAAAAAQFBQAAAAAEFQQIAAAABQgIAAAABQwIAAAABRAIAAAABRQIAAAABAAAAAAAAAAAABRUABhYABxcACBgACRkACgAAAAAABRUABhYABxcACBgACRkACgAAAAUVABAWABEXABIYABMZABQAAAAAAAUVABAWABEXABIYABMZABQBAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIaGAUbGQscGwwdHAweHwwfIAwgIQwhIwwiJQIjJg0kKAwlKgImKw4nLAwoLQwpLgIqMQ8rMhU"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map