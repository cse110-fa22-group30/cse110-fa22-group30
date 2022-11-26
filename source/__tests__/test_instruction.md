# To Do Unit Tests via 'npm test'

1) npm install --save-dev jest babel-jest @babel/core @babel/preset-env puppeteer jest-puppeteer
2) package.json = <br> 
{ <br>
&nbsp;&nbsp;"devDependencies": { <br>
&nbsp;&nbsp;&nbsp;&nbsp;... <br>
&nbsp;&nbsp;}, <br>
&nbsp;&nbsp;"scripts": { <br>
&nbsp;&nbsp;&nbsp;&nbsp;"test": "jest" <br>
&nbsp;&nbsp;}, <br>
&nbsp;&nbsp;"jest": { <br>
&nbsp;&nbsp;&nbsp;&nbsp;"preset": "jest-puppeteer", <br>
&nbsp;&nbsp;&nbsp;&nbsp;"verbose": true <br>
&nbsp;&nbsp;} <br>
} <br>
3) .babelrc  = <br>
{ <br>
  &nbsp;&nbsp;"env": { <br>
    &nbsp;&nbsp;&nbsp;&nbsp;"test": { <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"plugins": ["@babel/plugin-transform-modules-commonjs"] <br>
&nbsp;&nbsp;&nbsp;&nbsp;} <br>
&nbsp;&nbsp;} <br>
}
4) npm install --save-dev @babel/plugin-transform-modules-commonjs
5) npm audit fix --force