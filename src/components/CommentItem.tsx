type Props = {
    commentId: string;
    showParentComment?: boolean;
    showMedia?: boolean;
}

function CommentItem({commentId, showParentComment, showMedia = true}: Props) {
    const radixBase = 36;
    const post = Number(commentId).toString(radixBase);
    const parentParam = showParentComment ? '1' : '0';
    const mediaParam = showMedia ? '1' : '0';

    const url = `https://embed.disqus.com/p/${post}?p=${parentParam}&m=${mediaParam}`;

    return <iframe
        src={url}
        width={'100%'}
        height={260}
        seamless={true}
    />
}

export { CommentItem }
