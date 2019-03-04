CREATE SCHEMA playlist_populator;
SET SCHEMA 'playlist_populator';

CREATE TABLE app_user(
	email VARCHAR(100),
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	bucket_key VARCHAR(20),
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE playlist(
	owner_id INTEGER,
	playlist_id SERIAL PRIMARY KEY,
	playlist_name VARCHAR(100),
	bucket_key VARCHAR(20),
	saved BOOLEAN NOT NULL,
	unsplash_image_url VARCHAR(200)
);

CREATE TABLE song(
	album_art_url VARCHAR(200),
	artist_name VARCHAR(100) NOT NULL,
	danceability NUMERIC,
	energy NUMERIC,
	popularity INTEGER,
	song_id SERIAL PRIMARY KEY,
	song_key INTEGER,
	song_name VARCHAR(100) NOT NULL,
	spotify_artist_id VARCHAR(22) NOT NULL,
	spotify_track_id VARCHAR(22) NOT NULL UNIQUE,
	tempo NUMERIC,
	valence NUMERIC,
	UNIQUE(song_name, artist_name)
);

CREATE INDEX spotify_track_id_index ON song(spotify_track_id);

CREATE TABLE category(
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) UNIQUE NOT NULL,
	image_url VARCHAR(200)
);

CREATE TABLE users_liked_songs(
	user_id INTEGER REFERENCES app_user(user_id) NOT NULL,
	song_id INTEGER REFERENCES song(song_id) NOT NULL,
	UNIQUE(user_id, song_id)
);

CREATE TABLE users_playlists(
	user_id INTEGER REFERENCES app_user(user_id) NOT NULL,
	playlist_id INTEGER REFERENCES playlist(playlist_id) NOT NULL,
	UNIQUE(user_id, playlist_id)
);

CREATE TABLE playlists_songs(
	playlist_id INTEGER REFERENCES playlist(playlist_id) NOT NULL,
	song_id INTEGER REFERENCES song(song_id) NOT NULL,
	UNIQUE(playlist_id, song_id)
);

CREATE INDEX playlist_id_index ON playlists_songs(playlist_id);
CREATE INDEX song_id_index ON playlists_songs(song_id);

CREATE TABLE playlists_categories(
	playlist_id INTEGER REFERENCES playlist(playlist_id) NOT NULL,
	category_id INTEGER REFERENCES category(category_id) NOT NULL,
	UNIQUE(playlist_id, category_id)
);