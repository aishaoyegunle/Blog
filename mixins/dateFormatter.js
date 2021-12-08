import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default {
  methods: {
    dateFormatter(date) {
      return dayjs(date).fromNow()
    }
  }
}