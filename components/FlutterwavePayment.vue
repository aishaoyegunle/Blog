<template>
  <button class="btn--solid" @click.prevent="makePayment()">JOIN US</button>
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
        onclose: () => this.closePaymentModal()
      });
    },
    callback(response){
      if (response.status === "successful") {
        this.closePaymentModal(1000)
      }
    },
    closePaymentModal(timeout=0) {
      setTimeout(() => {
          document.getElementsByName('checkout')[0].setAttribute('style',
              'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
          document.body.style.overflow = '';
      }, timeout)
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