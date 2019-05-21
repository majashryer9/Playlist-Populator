import * as React from 'react';
import { IState, IPlaylistState } from 'src/reducers';
import { connect } from 'react-redux';
import CategorySearch from './category-search';
import SongSearch from './song-search';
import ArtistSearch from './artist-search';
import { Song } from 'src/models/Song';
import { Category } from 'src/models/Category';
import { Artist } from 'src/models/Artist';

export class AdvancedSearchContainer extends React.Component<IPlaylistState, any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                <CategorySearch />
                {
                    this.props.categoriesForSearch.map((categoryForSearch: Category) => {
                        return (
                            <div key={categoryForSearch.name}>
                                {categoryForSearch.name}
                            </div>
                        );
                    })
                }
                <SongSearch />
                {
                    this.props.songsForSearch.map((songForSearch: Song) => {
                        return (
                            <div key={songForSearch.spotifyTrackId}>
                                {songForSearch.name}
                            </div>
                        )
                    })
                }
                <ArtistSearch />
                {
                    this.props.artistsForSearch.map((artistForSearch: Artist) => {
                        return (
                            <div key={artistForSearch.spotifyArtistId}>
                                {artistForSearch.artistName}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.playlist);
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchContainer);