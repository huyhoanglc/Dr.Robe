package com.huyhoanglc.microservices.notification_service.listener;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationListener {

    @KafkaListener(topics = "product-topic", groupId = "notification-group")
    public void handleNotification(String message) {
        System.out.println("Nhận được tin nhắn từ Kafka: " + message);
    }
}