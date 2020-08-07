import { h, FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { ProtectedRouter } from './components';
import { HCActionTypes, initMusicKit } from './state/actions';
import { HCState } from './state/reducer';
import { DispatchFn, useDispatch, useSelector } from './state/store';

export const App: FunctionComponent = () => {
    const dispatch: DispatchFn<HCActionTypes> = useDispatch();
    const { isInitialized, isAuthorized, isLoading, library } = useSelector(
        (state: HCState) => state,
    );

    useEffect(() => {
        dispatch(initMusicKit());
    }, []);

    return (
        <div id="root-container">
            <ProtectedRouter isAuthorized={isAuthorized}>
                <Library library={library} />
            </ProtectedRouter>
        </div>
    );
};

interface LibraryProps {
    library: MusicKit.Resource[];
}

export const Library: FunctionComponent<LibraryProps> = ({
    library,
}: LibraryProps) => {
    console.log(library);

    return (
        <div id="library-container">
            <div className="library-grid-view">
                {library.map(({ id, attributes }) => {
                    const { artwork, name, artistName } = attributes as {
                        artwork: MusicKit.Artwork;
                        name: string;
                        artistName: string;
                    };

                    return (
                        <AlbumCard
                            key={id}
                            id={id}
                            albumArtUrl={MusicKit.formatArtworkURL(
                                artwork,
                                150,
                                150,
                            )}
                            onClick={() => {}}
                            name={name}
                            artist={artistName}
                        />
                    );
                })}
            </div>
        </div>
    );
};

interface AlbumCardProps {
    id: string;
    name: string;
    artist: string;
    albumArtUrl: string;
    onClick: (id: string) => void;
}

export const AlbumCard: FunctionComponent<AlbumCardProps> = ({
    id,
    name,
    albumArtUrl,
    artist,
    onClick,
}) => {
    return (
        <div onClick={() => onClick(id)} class="album-card">
            <div class="album-card-artwork">
                <img src={albumArtUrl} alt={name} />
            </div>
            <div class="album-card-name">{name}</div>
            <div class="album-card-artist">{artist}</div>
        </div>
    );
};
