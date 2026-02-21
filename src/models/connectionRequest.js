const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
    },
  },
  {
    timestamps: true,
  },
);

//connectionRequestSchema.index({fromUserId:3427387340948390, toUserId:398275903030823935290});

connectionRequestSchema.index({fromUserId:1, toUserId:1});

connectionRequestSchema.pre("save", async function() {
  const connectionRequest = this;

  //check if the fromUserId is same as toUserId

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You can't send connection request to yourself!!");
  }
  //never forgot to  next() call over here because it is like a middleware, otherwise the code will not move ahead
  // next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequestModel",
  connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
