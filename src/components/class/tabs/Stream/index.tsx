import CreatePost from 'src/components/class/tabs/Stream/CreatePost';
import PostList from 'src/components/class/tabs/Stream/PostsList';

export default function ClassStream() {
  return (
    <div>
      <CreatePost
        onNewPost={(data: { content: string; files: File[] }) => {
          console.info({ data });
        }}
      />
      <PostList
        posts={[
          {
            id: 'asdsad',
            user: {
              fullName: 'Muhammed Aldulaimi',
              id: 'test-id',
              role: 'teacher',
              avatar: '',
            },
            content: 'Hello students! This is my first post!',
            date: new Date('2022-02-02'),
            edited: true,
            files: [
              {
                type: 'jpeg',
                name: 'hey',
                url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                local: false,
              },
              {
                type: 'pdf',
                name: 'hey',
                url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                local: false,
              },
              {
                type: 'webm',
                name: 'Webm Video Important asdasdadsads',
                url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                local: false,
              },
            ],
            comments: [
              {
                id: 'asdasd',
                user: {
                  fullName: 'Alice Wonderland',
                  id: 'test-id',
                  role: 'student',
                  avatar: '',
                },
                date: new Date('2022-02-02'),
                content: 'This is a comment',
              },
              {
                id: 'asdasd2',
                user: {
                  fullName: 'Alice Wonderland',
                  id: 'test-id',
                  role: 'student',
                  avatar: '',
                },
                date: new Date('2022-02-02'),
                content: 'This is a comment\nI really love comments',
              },
              {
                id: 'asdas3',
                user: {
                  fullName: 'Muhammed Aldulaimi',
                  id: 'test-id',
                  role: 'teacher',
                  avatar: '',
                },
                date: new Date('2022-02-02'),
                content: 'This is a comment',
              },
              {
                id: 'asdasd4',
                user: {
                  fullName: 'Alice Wonderland',
                  id: 'test-id',
                  role: 'student',
                  avatar: '',
                },
                date: new Date('2022-02-02'),
                content: 'This is a comment',
              },
              {
                id: 'asdasd5',
                user: {
                  fullName: 'Alice Wonderland',
                  id: 'test-id',
                  role: 'student',
                  avatar: '',
                },
                date: new Date('2022-02-02'),
                content: 'This is a comment',
              },
            ],
          },
          {
            id: 'asdsad2',
            user: {
              fullName: 'Johnson Peepee',
              id: 'test-id2',
              role: 'teacher',
              avatar: '',
            },
            edited: false,
            content: 'Hello students! This is my first post!',
            date: new Date('2022-02-02'),
            files: [
              {
                local: false,
                type: 'jpeg',
                url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: '',
              },
              {
                local: false,
                type: 'pdf',
                url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: '',
              },
              {
                local: false,
                type: 'webm',
                url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: '',
              },
            ],
            comments: [],
          },
        ]}
      />
    </div>
  );
}
