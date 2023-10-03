<template>
  <!-- <div class="qrcode" ref="qrCodeUrl"></div> -->
  <div class="qrcode">
    <img :src="imgD" alt="" :width="width" :height="height" />
  </div>
</template>
<script>
import QRCode from "qrcode";

export default {
  name: 'qrcode',
  data() {
    return {
      imgD: "",
    };
  },
  methods: {
    generateQR(qrObj) {
      try {
        return QRCode.toDataURL(qrObj);
      } catch (err) {
        console.error(err);
      }
    },
  },
  watch: {
    qrObj: {
      immediate: true,
      handler(newVal) {
        this.generateQR(newVal).then((res) => {
          this.imgD = res;
        });
      },
    },
  },
  props: {
    qrObj: {
      type: String,
      default: 'null',
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
  },
  mounted() {},
};
</script>
