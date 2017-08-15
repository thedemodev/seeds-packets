const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const theo = require('theo');
const sassVar = require('@sproutsocial/seeds-utils/sassvar').sassVar;
const getGulpTask = require('@sproutsocial/seeds-utils/getgulptask');
const javascriptConst = require('@sproutsocial/seeds-utils/constantcase').javascriptConst;
const makeDir = require('make-dir');

const motionTokensPath = './tokens.yml';
require('@sproutsocial/seeds-utils/theo');

function getGulpMotionTask(transform, format, opts = {}) {
  return getGulpTask('seeds-motion', transform, format, opts);
}

gulp.task('clean', () => {
  return del(['docs/downloads/*']);
});

gulp.task('motion-scss', getGulpMotionTask('web', 'scss'));
gulp.task('motion-js', getGulpMotionTask('js', 'common.js'));

gulp.task('motion-docs', done => {
  theo.plugins.file(motionTokensPath).pipe(theo.plugins.transform('web')).pipe(
    theo.plugins.getResult(result => {
      const tokens = JSON.parse(result);
      const easings = tokens.propKeys.map(key => {
        const prop = tokens.props[key];
        const {value, description} = prop;

        return {
          sass: sassVar(prop.package, prop.name),
          javascript: javascriptConst(prop.package, prop.name),
          value,
          description
        };
      });

      makeDir('docs/_includes/').then(() => {
        fs.writeFileSync(
          'docs/_includes/motion.html',
          `<!-- GENERATED BY GULP - DO NOT EDIT -->\n\n<script>window.seedsMotion = ${JSON.stringify(
            easings
          )};</script>`
        );
        done();
      });
    })
  );
});

gulp.task('default', gulp.series(['clean', gulp.parallel(['motion-scss', 'motion-js']), 'motion-docs']));