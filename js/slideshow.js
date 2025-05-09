document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideDuration = 8000; // 每张幻灯片显示时间
    
    // 设置初始幻灯片为活动状态
    slides[currentSlide].classList.add('active');
    
    // 幻灯片切换函数
    function changeSlide() {
      const currentSlideElement = slides[currentSlide];
      const nextSlideIndex = (currentSlide + 1) % slides.length;
      const nextSlideElement = slides[nextSlideIndex];
      
      // 重要：阻止当前幻灯片的缩放重置
      // 直接将即将离开的幻灯片的最终缩放状态固定
      if (currentSlideElement.classList.contains('active')) {
        // 保持当前幻灯片的放大状态
        currentSlideElement.style.transform = 'scale(1.1)';
        // 移除动画，防止中途被CSS重置
        currentSlideElement.style.animation = 'none';
      }
      
      // 将当前幻灯片标记为正在淡出，但保持其放大状态
      currentSlideElement.classList.remove('active');
      currentSlideElement.classList.add('fading-out');
      
      // 更新当前幻灯片索引
      currentSlide = nextSlideIndex;
      
      // 准备下一张幻灯片，确保起始状态是未放大的
      nextSlideElement.style.transform = 'scale(1)';
      // 移除可能存在的内联动画样式
      nextSlideElement.style.animation = '';
      // 激活下一张幻灯片，它会开始CSS的淡入和放大动画
      nextSlideElement.classList.add('active');
    }
    
    // 定时切换幻灯片
    setInterval(changeSlide, slideDuration);
    
    // 为所有幻灯片应用事件监听
    slides.forEach(slide => {
      // 当幻灯片完全淡出（不可见）时重置状态
      slide.addEventListener('transitionend', function(e) {
        // 仅处理不透明度的过渡结束
        if (e.propertyName === 'opacity') {
          // 只有当幻灯片已经完全淡出时才重置它
          if (slide.classList.contains('fading-out')) {
            // 移除fading-out类
            slide.classList.remove('fading-out');
            // 等待确实完全不可见后再重置变形
            setTimeout(() => {
              // 确保此时幻灯片依然不是活动状态才重置
              if (!slide.classList.contains('active')) {
                slide.style.transform = 'scale(1)';
                slide.style.animation = '';
              }
            }, 50); // 短暂延迟确保DOM完全更新
          }
        }
      });
    });
  });