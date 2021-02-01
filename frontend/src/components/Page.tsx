interface PageProps {
  title: string
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <main className="m-3">
      <div className="container p-3">
        <h2 className="text-center font-weight-bold mb-3" title={title}>
          {title}
        </h2><hr />
        <section className="mt-4">
          {children}
        </section>
      </div>
    </main>
  )
}

export default Page
