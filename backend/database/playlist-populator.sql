CREATE SCHEMA playlist_populator;
SET SCHEMA 'playlist_populator';

CREATE TABLE app_user(
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	bucket_key VARCHAR(20),
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE playlist(
	owner_id INTEGER REFERENCES app_user(user_id),
	playlist_id SERIAL PRIMARY KEY,
	playlist_name VARCHAR(200),
	playlist_description TEXT,
	bucket_key VARCHAR(20),
	saved BOOLEAN NOT NULL,
	unsplash_image_url VARCHAR(200)
);

CREATE TABLE song(
	album_art_url VARCHAR(200),
	artist_name VARCHAR(200) NOT NULL,
	danceability NUMERIC,
	energy NUMERIC,
	popularity INTEGER,
	preview_url VARCHAR(200),
	song_id SERIAL PRIMARY KEY,
	song_key INTEGER,
	song_name VARCHAR(200) NOT NULL,
	spotify_artist_id VARCHAR(22) NOT NULL,
	spotify_track_id VARCHAR(22) NOT NULL UNIQUE,
	tempo NUMERIC,
	valence NUMERIC,
	UNIQUE(song_name, artist_name)
);

CREATE INDEX spotify_track_id_index_song ON song(spotify_track_id);

CREATE TABLE category(
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(200) UNIQUE NOT NULL,
	image_url VARCHAR(200)
);

CREATE TABLE playlists_songs(
	playlist_id INTEGER REFERENCES playlist(playlist_id) NOT NULL,
	song_id INTEGER REFERENCES song(song_id) NOT NULL,
	UNIQUE(playlist_id, song_id)
);

CREATE INDEX playlist_id_index_playlists_songs ON playlists_songs(playlist_id);
CREATE INDEX song_id_index_playlists_songs ON playlists_songs(song_id);

CREATE TABLE playlists_categories(
	playlist_id INTEGER REFERENCES playlist(playlist_id) NOT NULL,
	category_id INTEGER REFERENCES category(category_id) NOT NULL,
	UNIQUE(playlist_id, category_id)
);

CREATE INDEX playlist_id_index_playlists_categories ON playlists_categories(playlist_id);
CREATE INDEX category_id_index_playlists_categories ON playlists_categories(category_id);

CREATE TABLE users_liked_songs(
	user_id INTEGER REFERENCES app_user(user_id) NOT NULL,
	song_id INTEGER REFERENCES song(song_id) NOT NULL,
	UNIQUE(user_id, song_id)
);