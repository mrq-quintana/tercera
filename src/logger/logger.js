import log4js from 'log4js';

//LOGGER
log4js.configure({
    appenders:{
      console:{type:"console"},
      error:{type:"file",filename:"./src/logger/error.log"},
      info:{type:"file",filename:"./src/logger/info.log"},
      warn:{type:"file",filename:"./src/logger/warn.log"},
  
      errorFilter: {
        type: "logLevelFilter",
        appender: "error",
        level: "error",
        maxLevel: "error",
      },
      warnFilter: {
        type: "logLevelFilter",
        appender: "warn",
        level: "warn",
        maxLevel: "warn",
      },
      infoFilter: {
        type: "logLevelFilter",
        appender: "info",
        level: "info",
        maxLevel: "info",
      },
    },
    categories:{
      default:{
        appenders:["console","errorFilter","warnFilter","infoFilter"],level:"info"
      }
    }
  })
  export default log4js.getLogger();