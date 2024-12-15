CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    code VARCHAR(20) NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);


CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    profile_picture VARCHAR(255),
    visi TEXT,
    misi TEXT,
    nomor_urut INT NOT NULL,
    vote_count INT DEFAULT 0,
    position_id INT NOT NULL,
    event_code VARCHAR(20) NOT NULL,
    FOREIGN KEY (event_code) REFERENCES event(code) ON DELETE CASCADE
);

CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    code_id INT NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (code_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE position (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE statistic (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_vote INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO position (name, description) VALUES
('Presiden', 'Posisi untuk pemimpin tertinggi dalam organisasi atau negara.'),
('Wakil Presiden', 'Posisi untuk mendampingi Presiden dan menggantikan jika Presiden tidak dapat menjalankan tugasnya.'),
('Sekretaris', 'Posisi yang bertanggung jawab atas administrasi dan pengelolaan dokumen.'),
('Bendahara', 'Posisi yang bertanggung jawab atas keuangan dan laporan keuangan organisasi.');


CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    code VARCHAR(255) NOT NULL UNIQUE,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL
);

INSERT INTO event (name, description, code, start_date, end_date)
VALUES
    ('Pemilihan Umum 2024', 'Pemilu untuk memilih anggota legislatif dan eksekutif.', 'EVT2024', '2024-12-10 08:00:00', '2024-12-12 17:00:00'),
    ('Pemilihan Ketua Organisasi', 'Pemilihan untuk memilih ketua organisasi di kampus.', 'EVT2023', '2024-06-05 09:00:00', '2024-06-05 18:00:00'),
    ('Festival Musik 2024', 'Festival musik tahunan yang menampilkan band lokal.', 'EVT2025', '2024-07-01 10:00:00', '2024-07-01 23:00:00');


