const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'img'];
const avatarChooser = document.querySelector('.ad-form__field input[id=avatar]');
const photosChooser = document.querySelector('.ad-form__upload input[id=images]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photosPreviewContainer=document.querySelector('.ad-form__photo-container');


avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) =>  fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});


const removeChildsExceptFirst = (parent) => {
  while (parent.children.length > 1) {
    parent.removeChild(parent.lastChild);
  }
};

photosChooser.addEventListener('change', () =>{
  removeChildsExceptFirst(photosPreviewContainer);
  const files = photosChooser.files;
  for (const file of files) {
    const photoWrapper=document.createElement('div');
    photoWrapper.classList.add('ad-form__photo');
    const newPreview=document.createElement('img');
    newPreview.src=URL.createObjectURL(file);
    photoWrapper.appendChild(newPreview);
    photosPreviewContainer.appendChild(photoWrapper);
  }
});

const removeAvatarPreview =()=>{
  avatarPreview.src='img/muffin-grey.svg';
};


const removePhotoPreviews =()=> {
  const containerChildren = photosPreviewContainer.children;
  const photoWrappers=[];
  for (const element of containerChildren) {
    if (element.classList.contains('ad-form__photo')){
      photoWrappers.push(element);
    }
  }
  for (let i=1; i<photoWrappers.length; i++){
    photoWrappers[i].remove();
  }
  photoWrappers[0].innerHTML= '';
};

export {removeAvatarPreview, removePhotoPreviews};


