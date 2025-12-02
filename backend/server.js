// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 允许跨域（虽然本地一般不需要，但加上更安全）
app.use(cors());

// 解析表单数据（application/x-www-form-urlencoded）
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务：把上一级目录（Xuanying_Learning）作为网站根目录
app.use(express.static(path.join(__dirname, '..')));

// 表单提交接口
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // 简单验证
  if (!name || !email || !message) {
    return res.status(400).send('<h3 style="color:red;">❌ 请填写所有字段！</h3><a href="/contact.html">← 返回</a>');
  }

  // 构造保存的数据行
  const data = `${new Date().toLocaleString('zh-CN')} | ${name} | ${email} | ${message}\n`;

  // 保存到 backend/submissions.txt
  fs.appendFile(path.join(__dirname, 'submissions.txt'), data, (err) => {
    if (err) {
      console.error('保存失败:', err);
    }
  });

  // 返回成功页面
  res.send(`
    <div style="text-align:center; margin-top:50px; font-family: sans-serif;">
      <h2>✅ 留言提交成功！</h2>
      <p>感谢你的分享～</p>
      <a href="/" style="display:inline-block; margin-top:20px; color:#2563eb; text-decoration:none;">
        ← 返回首页
      </a>
    </div>
  `);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ 服务器启动成功！`);
  console.log(`🌐 请访问: http://localhost:${PORT}`);
});