
module.exports = () => {

  const config = exports = {};

  config.logger = {
    dir: './logs/local', // 打印目录重定向
    outputJSON: true, // json格式输出
  };

  return {
    ...config,
  };
};
