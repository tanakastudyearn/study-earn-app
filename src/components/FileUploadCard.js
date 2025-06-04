import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, ProgressBar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../constants/theme';

const FileUploadCard = ({
  onSelectFile,
  onRemoveFile,
  maxSize = 50, // in MB
  acceptedTypes = ['pdf', 'doc', 'docx', 'mp4', 'mov'],
  file,
  uploading,
  uploadProgress = 0,
  error,
  style
}) => {
  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return 'document-text';
      case 'doc':
      case 'docx':
        return 'document';
      case 'mp4':
      case 'mov':
        return 'videocam';
      default:
        return 'document';
    }
  };

  const getFileTypeLabel = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return 'PDF Document';
      case 'doc':
      case 'docx':
        return 'Word Document';
      case 'mp4':
      case 'mov':
        return 'Video File';
      default:
        return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderUploadArea = () => (
    <View style={styles.uploadArea}>
      <Icon 
        name="cloud-upload-outline" 
        size={48} 
        color={theme.colors.primary} 
      />
      <Text style={styles.uploadText}>
        Drag and drop your file here or
      </Text>
      <Button
        mode="contained"
        onPress={onSelectFile}
        style={styles.browseButton}
      >
        Browse Files
      </Button>
      <Text style={styles.helperText}>
        Supported formats: {acceptedTypes.join(', ').toUpperCase()}
      </Text>
      <Text style={styles.helperText}>
        Maximum file size: {maxSize}MB
      </Text>
    </View>
  );

  const renderFilePreview = () => (
    <View style={styles.filePreview}>
      <View style={styles.fileInfo}>
        <Icon 
          name={getFileIcon(file.type)} 
          size={32} 
          color={theme.colors.primary} 
          style={styles.fileIcon}
        />
        <View style={styles.fileDetails}>
          <Text style={styles.fileName} numberOfLines={1}>
            {file.name}
          </Text>
          <Text style={styles.fileMetadata}>
            {getFileTypeLabel(file.type)} • {formatFileSize(file.size)}
          </Text>
        </View>
        <IconButton
          icon="close"
          size={20}
          onPress={onRemoveFile}
          style={styles.removeButton}
        />
      </View>

      {uploading && (
        <View style={styles.uploadProgress}>
          <ProgressBar
            progress={uploadProgress}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            Uploading... {Math.round(uploadProgress * 100)}%
          </Text>
        </View>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );

  return (
    <Card style={[styles.card, style]}>
      <Card.Content>
        {file ? renderFilePreview() : renderUploadArea()}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    elevation: theme.elevation.small,
  },
  uploadArea: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.background,
  },
  uploadText: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
  browseButton: {
    marginBottom: theme.spacing.md,
  },
  helperText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  filePreview: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    marginRight: theme.spacing.md,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  fileMetadata: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  removeButton: {
    margin: 0,
  },
  uploadProgress: {
    marginTop: theme.spacing.md,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: `${theme.colors.primary}20`,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});

export default FileUploadCard;
