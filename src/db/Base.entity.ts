// // import * as MomentTZ from 'moment-timezone';
// import { BaseEntity, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';

// import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

// export class ModelEntity<T extends ModelEntity<T>> extends BaseEntity {
//   @PrimaryGeneratedColumn('increment') id: number;

//   @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()', name: 'created_at' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()', name: 'updated_at' })
//   updatedAt: Date;

//   constructor(values?: FilteredModelAttributes<T>) {
//     super();
//     Object.assign<object, FilteredModelAttributes<T>>(this, values);
//   }

//   @BeforeUpdate()
//   beforeUpdate() {
//     this.updatedAt = new Date();
//   }

//   @BeforeInsert()
//   beforeInsert() {
//     this.createdAt = new Date();
//     this.updatedAt = new Date();
//   }
// }

// export declare type Diff<T extends string | symbol | number, U extends string | symbol | number> = ({
//   [P in T]: P;
// } & {
//   [P in U]: never;
// } & {
//   [x: string]: never;
// })[T];
// export declare type Omit<T, K extends keyof T> = {
//   [P in Diff<keyof T, K>]: T[P];
// };
// export declare type RecursivePartial<T> = {
//   [P in keyof T]?: RecursivePartial<T[P]>;
// };
// export declare type NonAbstract<T> = {
//   [P in keyof T]: T[P];
// };

// export type FilteredModelAttributes<T extends ModelEntity<T>> = RecursivePartial<Omit<T, keyof ModelEntity<any>>> & {
//   // id?: number | any;
//   id?: number;
//   createdAt?: Date | any;
//   updatedAt?: Date | any;
// };

// const JsonArrayTransformer: ValueTransformer = {
//   to: (entityValue: any) => {
//     if (Array.isArray(entityValue) && entityValue.length === 0) {
//       return {};
//     }
//     return entityValue;
//   },
//   from: (databaseValue: any) => {
//     if (databaseValue === null || databaseValue === undefined) return [];
//     if (databaseValue && typeof databaseValue === 'object' && !Array.isArray(databaseValue) && Object.keys(databaseValue).length === 0) return [];
//     else return databaseValue;
//   },
// };

// export const StringArray: ColumnOptions = {
//   array: true,
//   type: 'varchar',
//   default: {},
// };
// export const IntArray: ColumnOptions = {
//   array: true,
//   type: 'int',
//   default: {},
// };
// export const JsonArray: ColumnOptions = {
//   type: 'jsonb',
//   array: true,
//   default: {},
//   transformer: JsonArrayTransformer,
// };
// export const SimpleJson: ColumnOptions = { type: 'jsonb', default: {} };
// export const DoublePrecision: ColumnOptions = { type: 'double precision' };
