import Vue from 'vue'
import moment from 'moment'

Vue.filter('transformDate', value => {
  if (value) {
    return moment(value).format('YYYY-MM-DD hh:mm:ss')
  }
  return null
})
