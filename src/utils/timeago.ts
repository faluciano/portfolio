export function timeAgo(timestamp: string) {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(timestamp).getTime()) / 1000
    );

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval.toString() + " years ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval.toString() + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval.toString() + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval.toString() + " hours ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval.toString() + " minutes ago";
    }

    return Math.floor(seconds).toString() + " seconds ago";
  }