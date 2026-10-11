CREATE DATABASE IF NOT EXISTS focusflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE focusflow;

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(40) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS settings (
    user_id INT UNSIGNED NOT NULL,
    pomodoro INT UNSIGNED NOT NULL DEFAULT 25,
    short_break INT UNSIGNED NOT NULL DEFAULT 5,
    long_break INT UNSIGNED NOT NULL DEFAULT 15,
    long_break_interval INT UNSIGNED NOT NULL DEFAULT 4,
    auto_start_breaks TINYINT(1) NOT NULL DEFAULT 0,
    auto_start_pomodoros TINYINT(1) NOT NULL DEFAULT 0,
    auto_check_tasks TINYINT(1) NOT NULL DEFAULT 0,
    check_to_bottom TINYINT(1) NOT NULL DEFAULT 0,
    alarm_sound VARCHAR(32) NOT NULL DEFAULT 'kitchen',
    alarm_volume INT UNSIGNED NOT NULL DEFAULT 60,
    alarm_repeat INT UNSIGNED NOT NULL DEFAULT 1,
    focus_sound VARCHAR(32) NOT NULL DEFAULT 'none',
    focus_volume INT UNSIGNED NOT NULL DEFAULT 40,
    lang VARCHAR(8) NOT NULL DEFAULT 'en',
    PRIMARY KEY (user_id),
    CONSTRAINT fk_settings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tasks (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    title VARCHAR(160) NOT NULL,
    estimate INT UNSIGNED NOT NULL DEFAULT 1,
    done_pomodoros INT UNSIGNED NOT NULL DEFAULT 0,
    is_done TINYINT(1) NOT NULL DEFAULT 0,
    position INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_tasks_user_position (user_id, position),
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    task_id INT UNSIGNED NULL,
    mode ENUM('pomodoro', 'short', 'long') NOT NULL,
    minutes INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_sessions_user_created (user_id, created_at),
    KEY idx_sessions_task (task_id),
    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_sessions_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;