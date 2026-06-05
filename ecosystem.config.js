/** @type {import('@types/pm2').ProcessDescription} */
module.exports = {
    apps: [
        {
            name: 'certibr',
            script: 'node_modules/.bin/next',
            args: 'start',
            cwd: './',

            // cluster usa todos os cores da CPU — load balance automático entre instâncias
            instances: 'max',
            exec_mode: 'cluster',

            // reinicia automaticamente se crashar ou ultrapassar o limite de memória
            autorestart: true,
            max_memory_restart: '256M',
            min_uptime: '5s',
            max_restarts: 10,

            // zero-downtime reload: aguarda a nova instância estar pronta antes de matar a antiga
            wait_ready: true,
            listen_timeout: 10000,
            kill_timeout: 5000,

            watch: false,

            // NODE.JS performance flags
            node_args: [
                '--max-old-space-size=256', // alinha com max_memory_restart
                '--optimize-for-size',
            ],

            env_production: {
                NODE_ENV: 'production',
                PORT: 8001,
            },

            error_file: './logs/pm2/error.log',
            out_file: './logs/pm2/out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            merge_logs: true,
        },
    ],
};
