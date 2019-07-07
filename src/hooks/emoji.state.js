import { useState } from 'react';

export const EmojiState = initialState => {
  const [emoji, setEmoji] = useState(initialState);

  const onSetEmoji = emoji => setEmoji(emoji);

  return [emoji, onSetEmoji];
};
