<template>
  <button class="btn--solid" @click="makePayment">JOIN US</button>
</template>

<script>
export default {
  data(){
    return{
      raveKey: process.env.RAVE_KEY_TEST,
      reference:''
    }
  },
  created() {
    this.generateReference()
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js"
      // eslint-disable-next-line nuxt/no-globals-in-created
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  },
  methods:{
    makePayment() {
      // eslint-disable-next-line no-undef
      FlutterwaveCheckout({
        public_key: this.raveKey,
        tx_ref: this.reference,
        amount: 25,
        currency: "USD",
        country: "US",
        payment_options: "card",
        customer: {
          email: "ne@gmail.com",
          phone_number: "08139579326",
          name: "Flutterwave Developers",
        },
        callback: (response) => this.callback(response),
      });
    },
    generateReference() {
      const date = new Date();
      const fullDate = `${date.getDate()}${date.getMonth()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
      this.reference = `BLOG-${fullDate}`;
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn--solid {
    @include btn--solid;
  }
</style>