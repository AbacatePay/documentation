const toYoutubeId = (value) => {
  if (!value || typeof value !== "string") return ""

  const trimmed = value.trim()
  if (!trimmed) return ""

  if (!trimmed.includes("/") && !trimmed.includes(" ") && !trimmed.includes("?")) {
    return trimmed
  }

  try {
    const url = new URL(trimmed)
    if (url.hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || ""
    }

    const fromQuery = url.searchParams.get("v")
    if (fromQuery) return fromQuery

    const parts = url.pathname.split("/").filter(Boolean)
    const marker = parts.findIndex((part) => part === "embed" || part === "shorts" || part === "live")
    if (marker >= 0 && parts[marker + 1]) return parts[marker + 1]
  } catch {
    return ""
  }

  return ""
}

export const Video = ({ id, title = "Vídeo AbacatePay" }) => {
  const videoId = toYoutubeId(id)

  if (!videoId) {
    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "32px auto",
          aspectRatio: "16 / 10",
          borderRadius: "8px",
          border: "1px dashed rgba(158,234,108,0.4)",
          background: "rgba(158,234,108,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <p style={{ margin: 0, opacity: 0.7 }}>Vídeo em breve</p>
      </div>
    )
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        margin: "32px auto",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}
