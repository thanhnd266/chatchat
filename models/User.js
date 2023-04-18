const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      umique: true,
    },
    password: {
      type: String,
      require,
      min: 6,
    },
    profilePicture: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/OOjs_UI_icon_userAvatar-progressive.svg/1200px-OOjs_UI_icon_userAvatar-progressive.svg.png",
    },
    coverPicture: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/1TQOnwV9Ng_vKEsa7uV06RMOcj4_f3HnxqJ7ygVO13BaO0Bb3B5qFp3Y3dYQFpENuOxjvPDk-277K12BwvgO-jb1DCD70_vgkh_SlBGJeLeOSZ7C7N58vit2yrkeEwd9QJxQFcOUF2fseWa4A3Yai9FEJumYMoTdzPgPZkxHYQ90ck52Q4ZCqgPesTlRelCpn-jqi7a6EfTliohGSdrOjsnjENNRQOEeVXsQu8HBgX6M7Oupxp4m29dHgLdCsmHQQn-nR1TWCflNUsZZo9sXNmd5ReOaGBnvcrI8S_oKGRTOA93TOSbr8ba48MxpuuVAYgCJtN7KYozrk1FjLjyEPPJa1Aj6sWoPK5arO6LzKVpfyh7pvlTSp2iP8PKX26glXDcRzv_uoCbTBKpoAqJUP4jHlZalOJHBg2B5XRs8FZQBafdL4nrDuuSztfceoze5YMJGsoYu5Aep5YRykzzTCvn9_3rbcZpuQeFf_GmBp9KRKoF1s-6qB0oQpRR7gbl7tOQwYdNuPy45kBuT-6NCR0MrIBNCZjAc6ctv5CZHguLfTiFuLMaaxIJ77KQeedEy7Oh2nhlikUMu9hjC8dVOjrc6qOfrBpV5JH-KKNlPSgDPj5HDA1d6Jklul_LjHhT05646BNN6PWdaNdx0LKOTNjhEDJPcJ0Nl=w1518-h858-no",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

UserSchema.index({ _id: 1, username: 1 });

module.exports = mongoose.model("User", UserSchema);
