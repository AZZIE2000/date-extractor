type ObjectSchema = {
    type: string;
    properties: object | null;
};
declare const _default: {
    typeString: {
        type: string;
        nullable: boolean;
    };
    typeStringOrNumber: {
        type: string[];
    };
    typeNumber: {
        type: string;
        nullable: boolean;
    };
    typeObject: {
        type: string;
        nullable: boolean;
    };
    typeBoolean: {
        type: string;
        nullable: boolean;
    };
    typeArray: {
        type: string;
        nullable: boolean;
    };
    createObjectSchemaType: (obj_type: string, props: object) => ObjectSchema;
};
export default _default;
