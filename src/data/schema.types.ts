import constants from '../constants'

type ObjectSchema = {
  type: string
  properties: object | null
}

export default {
  typeString: { type: constants.STRING_TYPE, nullable: true },
  typeStringOrNumber: { type: [constants.STRING_TYPE, constants.NUMBER_TYPE] },
  typeNumber: { type: constants.NUMBER_TYPE, nullable: true },
  typeObject: { type: constants.OBJECT_TYPE, nullable: true },
  typeBoolean: { type: constants.BOOL_TYPE, nullable: true },
  typeArray: { type: constants.ARRAY_TYPE, nullable: true },
  createObjectSchemaType: (obj_type: string, props: object): ObjectSchema => {
    return {
      type: obj_type,
      properties: {
        ...props,
      },
    }
  },
}
