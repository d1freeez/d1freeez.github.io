<template>
  <div>
    <h1>payment</h1>
    <button class="btn-blue" @click="onClick">Click</button>
  </div>
</template>
<script>
export default {
name: "payment",
  methods:{
    onClick () {
      let widget = new cp.CloudPayments();
      widget.pay('auth', // или 'charge'
        { //options
          publicId: 'pk_e5eddb5a74e4719fd502fb992cbc2', //id из личного кабинета
          description: 'Оплата товаров в oilama.com', //назначение
          amount: 10, //сумма
          currency: 'RUB', //валюта
          invoiceId: '1234567', //номер заказа  (необязательно)
          accountId: 'kuralbaevtemirlan@gmail.com', //идентификатор плательщика (необязательно)
          skin: "mini", //дизайн виджета (необязательно)
          data: {
            myProp: 'myProp value'
          }
        },
        {
          onSuccess: function (options) { // success
            console.log('Test onSuccess:', options);
            //действие при успешной оплате
          },
          onFail: function (reason, options) { // fa
            console.error('Test onFail:', reason , options);
            //действие при неуспешной оплате
          },
          onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
            //например вызов вашей аналитики Facebook Pixel
            console.log('Test onComplete:',paymentResult,  options);
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
