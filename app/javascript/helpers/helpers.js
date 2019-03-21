export const validatePost = (post) => {
  const errors = {};

  if (post.title === '') {
    errors.title = 'You must enter a title';
  }

  if (post.content === '') {
    errors.content = 'You must add a content';
  }

  if (post.author === '') {
    errors.author = 'You must add an author';
  }

  console.log(event);
  return errors;
}

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
}