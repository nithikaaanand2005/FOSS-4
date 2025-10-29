const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLFloat,
} = require('graphql');

const Task = require('../models/Task');

// Comment Types
const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    user: { type: GraphQLString },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
  },
});

const CommentInput = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: {
    user: { type: GraphQLString },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
  },
});

// HistoryLog Types
const HistoryLogType = new GraphQLObjectType({
  name: 'HistoryLog',
  fields: {
    field: { type: GraphQLString },
    oldValue: { type: GraphQLString },
    newValue: { type: GraphQLString },
    updatedBy: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

const HistoryLogInput = new GraphQLInputObjectType({
  name: 'HistoryLogInput',
  fields: {
    field: { type: GraphQLString },
    oldValue: { type: GraphQLString },
    newValue: { type: GraphQLString },
    updatedBy: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

// Task Type
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    priority: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: GraphQLString },
    estimatedHours: { type: GraphQLFloat },
    actualHours: { type: GraphQLFloat },
    progress: { type: GraphQLFloat },
    attachments: { type: new GraphQLList(GraphQLString) },
    createdBy: { type: GraphQLString },
    assignedTo: { type: GraphQLString },
    reviewer: { type: GraphQLString },
    team: { type: new GraphQLList(GraphQLString) },
    completedAt: { type: GraphQLString },
    isRecurring: { type: GraphQLBoolean },
    recurrencePattern: { type: GraphQLString },
    dependencies: { type: new GraphQLList(GraphQLID) },
    subTasks: { type: new GraphQLList(GraphQLID) },
    comments: { type: new GraphQLList(CommentType) },
    historyLog: { type: new GraphQLList(HistoryLogType) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

// Input Types
const TaskInput = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) }, // required for creation
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    priority: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: GraphQLString },
    estimatedHours: { type: GraphQLFloat },
    actualHours: { type: GraphQLFloat },
    progress: { type: GraphQLFloat },
    attachments: { type: new GraphQLList(GraphQLString) },
    createdBy: { type: GraphQLString },
    assignedTo: { type: GraphQLString },
    reviewer: { type: GraphQLString },
    team: { type: new GraphQLList(GraphQLString) },
    isRecurring: { type: GraphQLBoolean },
    recurrencePattern: { type: GraphQLString },
    dependencies: { type: new GraphQLList(GraphQLID) },
    subTasks: { type: new GraphQLList(GraphQLID) },
    comments: { type: new GraphQLList(CommentInput) },
    historyLog: { type: new GraphQLList(HistoryLogInput) },
  },
});

// Update Input (all fields optional)
const TaskUpdateInput = new GraphQLInputObjectType({
  name: 'TaskUpdateInput',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    priority: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: GraphQLString },
    estimatedHours: { type: GraphQLFloat },
    actualHours: { type: GraphQLFloat },
    progress: { type: GraphQLFloat },
    attachments: { type: new GraphQLList(GraphQLString) },
    createdBy: { type: GraphQLString },
    assignedTo: { type: GraphQLString },
    reviewer: { type: GraphQLString },
    team: { type: new GraphQLList(GraphQLString) },
    isRecurring: { type: GraphQLBoolean },
    recurrencePattern: { type: GraphQLString },
    dependencies: { type: new GraphQLList(GraphQLID) },
    subTasks: { type: new GraphQLList(GraphQLID) },
    comments: { type: new GraphQLList(CommentInput) },
    historyLog: { type: new GraphQLList(HistoryLogInput) },
  },
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: () => Task.find(),
    },
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => Task.findById(id),
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTask: {
      type: TaskType,
      args: { input: { type: new GraphQLNonNull(TaskInput) } },
      resolve: (_, { input }) => new Task(input).save(),
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(TaskUpdateInput) },
      },
      resolve: (_, { id, input }) => Task.findByIdAndUpdate(id, input, { new: true }),
    },
    deleteTask: {
  type: TaskType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_, { id }) => {
    const deleted = await Task.findByIdAndDelete(id);
    return deleted;
  },
},

  },
});

// Export schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
