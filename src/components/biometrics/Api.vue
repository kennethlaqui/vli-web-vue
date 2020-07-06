<template>
  <div>
    <v-btn @click="createClient">
      Create Client
    </v-btn>
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  data () {
    return {
      body: {
        name: 'VLI',
        redirect: null
      },
      sample: []
    }
  },
  methods: {
    // async createClient () {
    //   try {
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MGM1YWM5Mi0xYWQ3LTQ4MjctODU0NC04ZGY5YjZiN2M3YzgiLCJqdGkiOiJmYjc3YmJhYzhlZGM2NGJhNTY4MjIzNmRmNDRjNmFhMGMwZTJmYTEzMDgxNjgxZDZmZDQ0NDUzNWExODU1ZDM4MmYzZTk0MDc0ZWNkNjg1NyIsImlhdCI6MTU5MTgwNTc2NywibmJmIjoxNTkxODA1NzY3LCJleHAiOjE1OTE4OTIxNjcsInN1YiI6IiIsInNjb3BlcyI6WyIqIl19.J0XQI0u5_dzuaONq22RxTLOAsUCJYq8vTkhZYGHRswSi7pyVCd0nWv1oHm9xoPkXWdrBI4CzQb_ykmeKs7WwU4jIB6jTliKey-1rN7ngI54n6fDK7nsNqg96vLszK-O9era3NNkyYJ6Uwu_tMdIc-rBRVzJRTPfQ4rm-R4_skwZsqZqTe40cLrJBln6nowN20Ht0BD3MdgbO-PJmhr10RA-GcBMIssxnaldSUQ0F2ZfYt5026HHp2HsnZe3RT0EFYEPN537kVf6kyDgwRI14LMnxZ2QVZRWc_z5FrGliIS1Qo-cTbh_z-iv3zMd1fu_OX5vDIXchgHJAeSjo_qysdVBEPhSkwuwUqB0AtXz_vvlAYITfG2dKPDVJamzMLtLP80WPNlZz5rdH8x3uZFJx7xXdOKD6OiML6U9RQvgRSTwMngZ3hCT6aDCxXIjWis42DqjiO4-wKzvguHN7-B-GMR2ujIHjkROGVaNZz8GSaRIs5bEJB8SMIZaDBY-3fPQe05MruSKvJVXUIWaNcjvhIKAl00mzY5z8Smwdz9zL6fezzNTfoWokjqkysL_2QO8nxPzmTpqewCHof38ycqtaPqeo7vBg0ph8m3uPZAHnA4up9CUeNsDqCxLxySbVCroTFkftNo-fkfhSsJQBS4pj7v2_UOhSOa2l1wuPpyIjgpk'2
    //     if (this.$store.getters.loggedIn) {
    //       await new Promise((resolve, reject) => {
    //         axios.get('http://192.168.0.11:8083/api/sample')
    //           .then(response => {
    //             this.sample = response.data
    //             resolve(response)
    //           })
    //           .catch(error => {
    //             reject(error)
    //           })
    //       })
    //     }
    //   } catch (error) {
    //   }
    // }
  }
}
</script>
