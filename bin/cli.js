#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

// 定义版本号
program.version('1.0.0');

// 封装 download-git-repo 为 Promise
function downloadTemplate(repository, destination) {
    return new Promise((resolve, reject) => {
        // 创建加载动画
        const spinner = ora({
            text: '正在下载模板...',
            color: 'yellow',
            spinner: {
                interval: 80,
                frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
            }
        }).start();

        let lastProgressTime = Date.now();
        let lastProgress = 0;

        // 下载模板
        download(repository, destination, { clone: true }, (err) => {
            if (err) {
                spinner.fail(chalk.red('❌ 下载模板失败'));
                console.error(chalk.red('错误详情:', err));
                reject(err);
                return;
            }

            spinner.succeed(chalk.green('✅ 项目创建成功!'));
            resolve();
        });

        // 模拟进度更新
        const updateProgress = () => {
            const currentTime = Date.now();
            const timeDiff = currentTime - lastProgressTime;

            // 计算下载速度（模拟）
            const progress = Math.min(lastProgress + (timeDiff / 1000) * 20, 99);
            const speed = ((progress - lastProgress) / (timeDiff / 1000)).toFixed(2);

            spinner.text = `正在下载模板... ${progress.toFixed(1)}% (${speed} KB/s)`;

            lastProgress = progress;
            lastProgressTime = currentTime;

            if (progress < 99) {
                setTimeout(updateProgress, 200);
            }
        };

        updateProgress();
    });
}

// 创建项目命令
program
    .command('create <project-name>')
    .description('创建一个新项目')
    .action(async (projectName) => {
        console.log(chalk.blue('🚀 正在创建项目:', projectName));

        const questions = [
            {
                type: 'list',
                name: 'language',
                message: '请选择开发语言:',
                choices: ['JavaScript', 'TypeScript']
            },
            {
                type: 'list',
                name: 'framework',
                message: '请选择项目框架:',
                choices: ['jh-vue', 'jh-react']
            }
        ];

        try {
            const answers = await inquirer.prompt(questions);
            const templateType = `${answers.framework}-${answers.language.toLowerCase()}`;

            // 根据选择确定模板地址
            let templateUrl = '';
            switch (templateType) {
                case 'jh-vue-javascript':
                    templateUrl = 'direct:https://github.com/jianghengheng/blog.git';
                    break;
                case 'jh-vue-typescript':
                    templateUrl = 'direct:https://github.com/jianghengheng/blog.git'; // 需要替换为 TS 版本地址
                    break;
                case 'jh-react-javascript':
                    templateUrl = 'direct:https://github.com/jianghengheng/blog.git'; // 需要替换为 React JS 版本地址
                    break;
                case 'jh-react-typescript':
                    templateUrl = 'direct:https://github.com/jianghengheng/blog.git'; // 需要替换为 React TS 版本地址
                    break;
                default:
                    console.error(chalk.red('❌ 未知的模板类型'));
                    return;
            }

            console.log(chalk.blue(`📦 选择的技术栈: ${answers.framework} with ${answers.language}`));

            try {
                await downloadTemplate(templateUrl, projectName);
                console.log(chalk.blue('\n🎉 开始使用:'));
                console.log(chalk.white(`  cd ${projectName}`));
                console.log(chalk.white('  npm install'));
                console.log(chalk.white('  npm run dev'));
            } catch (err) {
                // 错误已在 downloadTemplate 中处理
            }
        } catch (error) {
            console.error(chalk.red('❌ 发生错误:', error));
        }
    });

program.parse(process.argv); 