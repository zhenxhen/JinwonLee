document.getElementById('clip-button').onclick = function() {
    var button = this;
    button.classList.add('shake');
    setTimeout(function() {
        button.classList.remove('shake');
    }, 820);
};

// YouTube 비디오 ID 추출 함수
function getYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// YouTube oEmbed API로 비디오 정보 가져오기
async function getYouTubeVideoInfo(videoUrl) {
    try {
        const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        return {
            title: data.title,
            author: data.author_name,
            thumbnail: data.thumbnail_url
        };
    } catch (error) {
        console.error('YouTube 정보 가져오기 실패:', error);
        return null;
    }
}

// 페이지 로드 시 YouTube 카드 정보 업데이트
async function updateYouTubeCards() {
    const cards = document.querySelectorAll('.youtube-card');
    
    for (let card of cards) {
        const videoUrl = card.href;
        const videoInfo = await getYouTubeVideoInfo(videoUrl);
        
        if (videoInfo) {
            // 제목 업데이트
            const titleElement = card.querySelector('.youtube-title');
            if (titleElement) {
                titleElement.textContent = videoInfo.title;
            }
            
            // 채널명 업데이트
            const channelElement = card.querySelector('.youtube-channel');
            if (channelElement) {
                channelElement.textContent = videoInfo.author;
            }
            
            // 썸네일 업데이트 (더 고화질 버전)
            const thumbnailElement = card.querySelector('.youtube-thumbnail img');
            if (thumbnailElement && videoInfo.thumbnail) {
                thumbnailElement.src = videoInfo.thumbnail;
            }
        }
        
        // API 호출 간격 조절 (너무 빠르게 호출하지 않도록)
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

// 페이지 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    updateYouTubeCards();
});

// Feedbacks 스크롤 기능
function scrollFeedbacks(direction, containerId = 'feedbacks-container') {
    const container = document.getElementById(containerId);
    const scrollAmount = 265; // 카드 너비(250px) + 간격(15px)
    
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
}

